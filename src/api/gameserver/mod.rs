use hickory_resolver::TokioResolver;
use serde_with::DeserializeFromStr;
use std::{
    marker::PhantomData,
    net::{IpAddr, SocketAddr},
    str::FromStr,
};

pub mod minecraft;
pub mod teamfortress;

#[derive(DeserializeFromStr, Debug, Clone)]
pub struct GameServerAddress<T: GameServer> {
    pub host: String,
    pub port: Option<u16>,
    game_type: PhantomData<T>,
}

pub trait GameServer {
    const DEFAULT_PORT: u16;
    const IPV6_SUPPORT: bool = false;
    // const SRV_RECORD: Option<&'static str> = None;
}

const ERR_NO_IPV6: &'static str = "This game doesn't support IPv6.";
const ERR_PORT_NOT_U16: &'static str = "Port must be u16.";
const ERR_DOMAIN_WITH_COLON: &'static str =
    "Domain names can't contain colons; if this is ipv6, please wrap the address in brackets.";
impl<T: GameServer> FromStr for GameServerAddress<T> {
    type Err = &'static str;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match SocketAddr::from_str(s) {
            Ok(socket) => {
                if socket.is_ipv6() && !T::IPV6_SUPPORT {
                    return Err(ERR_NO_IPV6);
                }
                return Ok(GameServerAddress {
                    host: socket.ip().to_string(),
                    port: Some(socket.port()),
                    game_type: PhantomData,
                });
            }
            Err(_) => (),
        };
        match IpAddr::from_str(s) {
            Ok(addr) => {
                if addr.is_ipv6() && !T::IPV6_SUPPORT {
                    return Err(ERR_NO_IPV6);
                }
                return Ok(GameServerAddress {
                    host: addr.to_string(),
                    port: None,
                    game_type: PhantomData,
                });
            }
            Err(_) => (),
        };
        match s.rsplit_once(":") {
            Some((host, port)) => {
                if host.contains(':') {
                    return Err(ERR_DOMAIN_WITH_COLON);
                }
                Ok(GameServerAddress {
                    host: host.to_string(),
                    port: Some(port.parse::<u16>().map_err(|_| ERR_PORT_NOT_U16)?),
                    game_type: PhantomData,
                })
            }
            None => Ok(GameServerAddress {
                host: s.to_string(),
                port: None,
                game_type: PhantomData,
            }),
        }
    }
}

impl<T: GameServer> GameServerAddress<T> {
    pub async fn resolve(self) -> Result<SocketAddr, &'static str> {
        if let Ok(socket) = SocketAddr::from_str(
            format!("{}:{}", self.host, self.port.unwrap_or(T::DEFAULT_PORT)).as_str(),
        ) {
            return Ok(socket);
        }

        let resolver = TokioResolver::builder_tokio().unwrap().build();
        let lookup = resolver
            .lookup_ip(self.host)
            .await
            .map_err(|_| "DNS Lookup failed")?;

        if let Some(ip) = lookup.iter().next() {
            match ip {
                IpAddr::V4(_) => Ok(SocketAddr::new(ip, self.port.unwrap_or(T::DEFAULT_PORT))),
                IpAddr::V6(_) => {
                    if T::IPV6_SUPPORT {
                        Ok(SocketAddr::new(ip, self.port.unwrap_or(T::DEFAULT_PORT)))
                    } else {
                        Err("The returned address was IPV6, which is unsupported by the game.")
                    }
                }
            }
        } else {
            Err("DNS Lookup returned no IP addresses for this hostname.")
        }
    }
}

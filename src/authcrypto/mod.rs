use argon2::{Argon2, PasswordHash, PasswordHasher, PasswordVerifier, password_hash::SaltString};
use rand::{TryRngCore, rngs::OsRng};

#[derive(Debug, Clone, Copy)]
#[allow(unused)]
pub enum TokenSize {
    /// 5 bytes = 8 chars
    Char8,
    /// 10 bytes = 16 chars
    Char16,
    /// 20 bytes = 32 chars
    Char32,
    /// 40 bytes = 64 chars
    Char64,
}

impl TokenSize {
    pub fn bytes(&self) -> usize {
        match self {
            TokenSize::Char8 => 5,
            TokenSize::Char16 => 10,
            TokenSize::Char32 => 20,
            TokenSize::Char64 => 40,
        }
    }
}

pub fn generate_token(len: TokenSize) -> String {
    let mut bytes = vec![0u8; len.bytes()];
    let mut rng = OsRng;
    rng.try_fill_bytes(&mut bytes).unwrap();
    base32::encode(base32::Alphabet::Crockford, &bytes)
}

pub fn hash_password(passw: &str) -> Result<String, String> {
    use rand08::rngs::OsRng as ArgonOsRng;

    let argon = Argon2::default();
    let passw = passw.as_bytes();
    let salt = SaltString::generate(&mut ArgonOsRng);
    Ok(argon
        .hash_password(passw, &salt)
        .map_err(|_| "Password hash fail.")?
        .to_string())
}

pub fn check_hashed_password(passw: &str, hash: &str) -> Result<bool, String> {
    let argon = Argon2::default();
    let passw = passw.as_bytes();
    let hash = PasswordHash::try_from(hash).map_err(|_| "Hash ain't hashing.")?;
    Ok(argon.verify_password(passw, &hash).is_ok())
}

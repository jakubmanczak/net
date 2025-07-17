use std::cmp::Ordering;

#[derive(Debug)]
pub enum FilesDirEntry {
    Dir { name: String },
    File { name: String },
}

impl PartialEq for FilesDirEntry {
    fn eq(&self, other: &Self) -> bool {
        self.cmp(other) == Ordering::Equal
    }
}

impl Eq for FilesDirEntry {}

impl PartialOrd for FilesDirEntry {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl Ord for FilesDirEntry {
    fn cmp(&self, other: &Self) -> Ordering {
        use FilesDirEntry::*;
        match (self, other) {
            (Dir { name: name_a }, Dir { name: name_b })
            | (File { name: name_a }, File { name: name_b }) => name_a.cmp(name_b),
            (Dir { .. }, File { .. }) => Ordering::Less,
            (File { .. }, Dir { .. }) => Ordering::Greater,
        }
    }
}

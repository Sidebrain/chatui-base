from pydantic import BaseModel


class ProviderBase(BaseModel):
    name: str
    oauth_url: str
    token_url: str
    client_id: str
    public_key: str
    enabled: bool = True

class ProviderCreate(ProviderBase):
    client_secret: str
    private_key: str

class ProviderUpdate(ProviderBase):
    client_secret: str
    private_key: str

class Provider(ProviderBase):
    id: int

    class Config:
        orm_mode = True
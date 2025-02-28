export type Member = {
    member_id: number,
    status: string,
    name: string,
    email: string,
    password: string,
    phone: string | null,
    profile_url: string | null,
    organization_id: number,
    created_at: string,
    updated_at: string
  }
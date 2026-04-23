const seckret_keys: any = {
      admin_seckret_key: "admin",
      user_seckret_key: "user",
      service_provider_seckret_key: "service_provider",
}

const scope: any = {
      admin: "admin",
      user: "user",
      provider: "service_provider",
}

const default_limit = 10;
const salt_rounds = 10;


export {
      seckret_keys,
      scope,
      default_limit,
      salt_rounds
}

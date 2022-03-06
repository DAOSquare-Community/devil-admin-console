import { ConfigModel } from 'models/Config'

export default class ConfigService {
  insertConfig = async () => {
    const cfg = new ConfigModel()
    cfg.name = 'ChainType'
    cfg.value = ['xDai', 'Mainnet', 'Matic']
    cfg.des = 'chain type'
    cfg.create_at = new Date()
    cfg.last_update_at = new Date()
    const res = await ConfigModel.create(cfg)
    return res
  }
}

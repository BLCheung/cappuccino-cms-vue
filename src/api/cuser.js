import Config from '@/config/config';

const prefix = `${ Config.apiVersion }user`;

const CUserApi = {
  // C端用户分页
  USERS: `${ prefix }/page`,
  // C端用户详情
  USER:  `${ prefix }/{id}`,
}

export default CUserApi;

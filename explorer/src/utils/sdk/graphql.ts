import { request } from "./tools";
import { userInfo, ContractAddress } from "./config";
/**
 * 交易阶段的榜单
 * @returns 
 */
export async function getHealthList() {
  const query = `
  {
    borrowUsersEntity(id:"1"){
      users
    }
  }`;
  let data = await request(ContractAddress[5].gql, { query });
  return data.data.borrowUsersEntity?.users ?? [];
}
/**
 * 检查owner
 * @param ids 
 * @returns 
 */
export async function checkOwner(ids: any) {
  let str = "[";
  if (ids.length === 0) {
    str = str + "\"\",";
  }
  for (let i = 0; i < ids.length; i++) {
    str = str + `"${ids[i].token}",`;
  }
  str = str.slice(0, -1);
  str = str + "]";
  const query = `
  {
    recent: nftEntities(where: {id_in: ${str}}) {
      id
      owner
    }
  }`;
  let data = await request(ContractAddress[userInfo.chainID].gql, { query });
  return data.data.recent.map((item: any, index: number) => {
    return {
      ...ids[index],
      owner: item.owner
    }
  })
}
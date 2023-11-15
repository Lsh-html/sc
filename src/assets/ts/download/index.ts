export const downLoad = (text: string) => {
  const url = text + `?pageNo=1&pageSize=10&token=${localStorage.getItem('token')}`
  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.style.display = "none"; // 防止影响页面
  iframe.style.height = "0"; // 防止影响页面
  document.body.appendChild(iframe); // 必写，iframe挂在到dom树上才会发请求
  // 定时删除节点
  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 2000);
};

export const downLoad1 = (url: string) => {
  const link = document.createElement('a') // 创建一个 a 标签用来模拟点击事件	
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', '文件名')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}


const getPagesQuery = () => `{ 
    pages { list(orderBy:ID) { id } } }`

const showPages = ({ data }) => {
    console.log(data)
}


const loadData = () => {
    // e.preventDefault()
  
    const options = {
            method: "post",
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGkiOjIsImdycCI6MSwiaWF0IjoxNjQ3MTkyNDE4LCJleHAiOjE2Nzg3NTAwMTgsImF1ZCI6InVybjp3aWtpLmpzIiwiaXNzIjoidXJuOndpa2kuanMifQ.1TzC6vk2K_vPoNpT9L-gj_2LwuiJs5JQUShwUsIZdaf8H94KzzKeGfxD4yxhhzRhmDzgwElBtGLIWxhJPypptOVKUroV6YlFIlY1WqMSBo_iYNmJd9fZs9oMX_V2iIf71MgWDPXzILQ_OgsrusUbjMph39NlHOfyoZO7k5m8nZ-i045PT-vvnJFUxrzPEStEAUN1uA126qvKS1Q7xY4ul0Bq6JhHn5dPm-9CgN29Wmw-xZiXqmbBRld4LozIOVfa8JEUgtnQ8-lO3X6lMivMLPpPSN_BgxcVIcFL9TJi9lk220RJtObxvLnrqlDuZLQfCY_GeiV7sIou0v3iPZcd5Q' 
            },
            body: JSON.stringify({
                query: getPagesQuery()
            })
    }
  
    fetch(`https://wiki.reflux.media/graphql`, options)
      .then(res => res.json())
      .then(showPages)
  
}

loadData()
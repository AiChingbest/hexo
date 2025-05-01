var posts=["2025/04/28/Game-000001/","2025/04/28/Game-000002/","2025/04/30/Game-000003/","2025/04/30/Game-000004/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };
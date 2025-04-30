var posts=["2025/04/28/Game-000001/","2025/04/28/Game-000002/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };
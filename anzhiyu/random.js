var posts=["post/233853f2.html","post/a206aef0.html","post/4a17b156.html"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};
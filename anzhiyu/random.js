var posts=["post/a7c623a1.html","post/233853f2.html","post/4a17b156.html","post/2003bde4.html","post/a206aef0.html","post/2538fd0.html"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};
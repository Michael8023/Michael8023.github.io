var posts=["post/a7c623a1.html","post/cba1dcbe.html","post/2003bde4.html","post/4a17b156.html","post/233853f2.html","post/db306517.html","post/a206aef0.html","post/8ab2dce2.html","post/8cafc74a.html","post/2538fd0.html","post/13ef13e5.html","post/139de6d8.html"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};
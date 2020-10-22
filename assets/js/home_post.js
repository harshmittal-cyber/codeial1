const { toggleLike } = require("../../controllers/likes_controllers");

{
    //method to submit the form data for new post using Ajax
    let createPost=function(){
        let newPostForm=$('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:function(data){
                    // console.log(data)
                    let newPost=newPostDom(data.data.post);
                    $(`#posts-list-container>ul`).prepend(newPost);
                    deletepost($('.delete-post-button',newPost));

                    //call the create comment class
                    new PostComments(data.data.post._id);

                    //change::enale the functionality of toggle like button on the new post
                    new toggleLike($('.toggle-like-button',newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                },error:function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    //method to create a post in DOM
    let newPostDom=function(post){
        //chnage ::show the count of zero likes on this post
        return $(`<li id="post-${post._id}">
                    <p>
                
                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                        </small>
                        
                
                        ${ post.content}<br>
                        <small>
                            ${post.user.name}
                        </small>
                        <br>
                        <small>
                            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                0 Likes
                            </a>
                        
                        </small>
                    </p>
                    <div class="post-comment">
                        <form action="/comments/create" method="POST" id="post-${post._id}-comments-form">
                            <input type="text" name="content" placeholder="Type comment.." required>
                            <input type="hidden" name="post" value="${ post._id }">
                            <input type="submit" value="Add comment">
                            </form>
                        
                
                        <div class="post-comment-list">
                            <ul id="post-comments-${post._id}">   
                            </ul>
                        </div>
                    </div>
                </li>`)
    }
    //method to delete a post from DOM
    let deletepost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme:'relax',
                        text:"Post Deleted",
                        type:"Success",
                        layout:'topRight',
                        timeout:1500
                    }).show()
                },error:function(error){
                    console.log(error.responseText);
                }
            })
        })
    }



      // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
      let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }

    createPost();
    convertPostsToAjax();
}


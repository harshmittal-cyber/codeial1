//chnage:create a class to toggle likes when a link is clicked using AJax

// const { toggleLike } = require("../../controllers/likes_controllers");

class ToggleLike{
    constructor(toggleElement){
        this.toggler=toggleElement,
        this.toggleLike();
    }


    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();

            let self=this;

            //this is a new way of writing ajax it looks like as promises
            $.ajax({
                type:"POST",
                url:$(self).attr('href')
            })
            .done(function(data){
                let likesCount=parseInt($(self).attr('data-likes'));
                console.log(likesCount);

                if(data.data.deleted==true){
                    likesCount-=1
                }else{
                    likesCount+=1
                }

                $(self).attr('data-likes',likesCount);
                $(self).html(`${likesCount} Likes`);
            })
            .fail(function(errData){
                console.log('error in completing the request');
            })
        })
    }
}
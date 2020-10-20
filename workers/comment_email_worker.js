const queue=require('../config/kue');

//imported comments mailer
const commentMailer=require('../mailers/comments_mailer');

//calls the mailer
queue.process('emails',function(job,done){
    console.log('emails workers is processing a job',job.data);

    commentMailer.newComment(job.data);

    done();
})
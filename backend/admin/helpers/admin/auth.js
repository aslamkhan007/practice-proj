var self = module.exports = 
{
  userID:function(req) 
  {
    return req.session.user_data.user_id;
  },
  user:function(req,res,next) 
  {
    return req.session.user_data;
  },
  beforeLogin:function(req,res,next) 
  {
  	if(typeof req.session.user_data !== 'undefined')
  	{
  	  return res.redirect('/');
  	  next();
  	}
  	next();
  },
  afterLogin:function(req,res,next) 
  {
    console.log("req.session.user_data==",req.session.user_data)
    if(typeof req.session.user_data === 'undefined')
  	{
  	  return res.redirect('/admin/login');
  	  next();
  	}
  	next();
  }
}
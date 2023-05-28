const getAllJobs = async(req,res)=>{
    res.send('GetAllJobs ')
}

const getJob = async(req,res)=>{
    res.send('Get Job ')
}
const createJob = async(req,res)=>{
    res.send('Create Job ')
}
const updateJob = async(req,res)=>{
    res.send('Update Job ')
}
const deleteJob = async(req,res)=>{
    res.send('Delete Job ')
}


module.exports ={
    GetAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
    
}
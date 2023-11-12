const organisations = require("../models/orgSchema");
const users = require("../models/userSchema");
const userotp = require("../models/userOtp");
const nodemailer = require("nodemailer");



// email config
const tarnsporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

// organisation register controller //

exports.Orgregister = async (req, res) => {
    console.log("Request Body:", req.body);

    const { orgname, category, mobile, email, otp, user_type, location } = req.body;

    console.log("Values:",  orgname, category, mobile,  email, otp, user_type, location );

    if (!orgname ||  !category || !mobile || !email || !otp || !user_type  || !location) {
        console.log("Validation Failed");
        res.status(400).json({ error: "Please Enter All Input Data" });
        return;
    }

    try {
        const preuser = await organisations.findOne({ email: email });

        if (preuser) {
            console.log("User Already Exists");
            res.status(400).json({ error: "This Organisation Already Exists in our db" });
        } else {
            const orgregister = new organisations({
                orgname, category, email, otp, user_type, mobile, location
            });

            // Add password hashing logic here

            const storeData = await orgregister.save();
            console.log("Organisation Registered Successfully");
            res.status(200).json(storeData);
        }
    } catch (error) {
        console.log("Error:", error);
        res.status(400).json({ error: "Invalid Details", error });
    }
};





// org register otp send 
exports.RegisterOtpsend = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ error: "Please Enter Your Email" });
        return;
    }

    try {
        const OTP = Math.floor(100000 + Math.random() * 900000);

        const saveOtpData = new userotp({
            email, otp: OTP
        });

        await saveOtpData.save();

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Sending Email For OTP Validation",
            text: `OTP:- ${OTP}`
        };

        tarnsporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error", error);
                res.status(400).json({ error: "Email not sent" });
            } else {
                console.log("Email sent", info.response);
                res.status(200).json({ message: "Email sent Successfully" });
            }
        });
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error });
    }
};




// login controller 

// login send otp
exports.LoginOtpSend = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ error: "Please Enter Your Email" })
    }


    try {
        const presuer = await organisations.findOne({ email: email });

        if (presuer) {
            const OTP = Math.floor(100000 + Math.random() * 900000);

            const existEmail = await userotp.findOne({ email: email });


            if (existEmail) {
                const updateData = await userotp.findByIdAndUpdate({ _id: existEmail._id }, {
                    otp: OTP
                }, { new: true }
                );
                await updateData.save();

                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Sending Eamil For Otp Validation",
                    text: `OTP:- ${OTP}`
                }


                tarnsporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ message: "Email sent Successfully" })
                    }
                })

            } else {

                const saveOtpData = new userotp({
                    email, otp: OTP
                });

                await saveOtpData.save();
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Sending Eamil For Otp Validation",
                    text: `OTP:- ${OTP}`
                }

                tarnsporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ message: "Email sent Successfully" })
                    }
                })
            }
        } else {
            res.status(400).json({ error: "This User Not Exist In our Db" })
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }
};


exports.OrgLogin = async(req,res)=>{
    const {email,otp} = req.body;

    if(!otp || !email){
        res.status(400).json({ error: "Please Enter Your OTP and email" })
    }

    try {
        const otpverification = await userotp.findOne({email:email});

        if(otpverification.otp === otp){
            const preuser = await organisations.findOne({email:email});

            // token generate
            const token = await preuser.generateAuthtoken();
            const userData = {
                 user_id: preuser._id,
                 user_type : preuser.user_type,
                 orgname : preuser.orgname,
                 category : preuser.category,
                 mobile: preuser.mobile,
                 email: preuser.email,
                 location : preuser.location
               // Add other user properties as needed
            };

            res.status(200).json({
                message: "Organisation Login Successfully Done",
                userToken: token,
                userData: userData, // Send user data in the response
                 success: true,
            });

           //res.status(200).json({message:"User Login Succesfully Done",userToken:token, success: true});

        }else{
            res.status(400).json({error:"Invalid Otp"})
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }
}

// exports.OrgLogin = async (req, res) => {
//     const { email, otp } = req.body;

//     if (!otp || !email) {
//         res.status(400).json({ error: "Please Enter Your OTP and email" });
//         return; // Add return statement to exit the function if validation fails
//     }

//     try {
//         const otpverification = await userotp.findOne({ email: email });

//         if (otpverification.otp === otp) {
//             const preuser = await users.findOne({ email: email });

//             // token generate
//             const token = await preuser.generateAuthtoken();

//             // Get all user data
//             const userData = {
//                 user_id: preuser._id,
//                 user_type : preuser.user_type,
//                 fname : preuser.fname,
//                 lname : preuser.lname,
//                 gender: preuser.gender,
//                 dob: preuser.dob,
//                 bloodgroup: preuser.bloodgroup,
//                 mobile: preuser.mobile,
//                 email: preuser.email,
//                 lastdonationdate: preuser.lastdonationdate,
//                 location : preuser.location


//                 // Add other user properties as needed
//             };

//             res.status(200).json({
//                 message: "User Login Successfully Done",
//                 userToken: token,
//                 userData: userData, // Send user data in the response
//                 success: true,
//             });
//         } else {
//             res.status(400).json({ error: "Invalid Otp", success: false });
//         }
//     } catch (error) {
//         res.status(400).json({ error: "Invalid Details", error });
//     }
// };
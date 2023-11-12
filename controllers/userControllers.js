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

// user register 

exports.userregister = async (req, res) => {
    const { fname, lname, gender, dob, bloodgroup, mobile,  email, otp, user_type, lastdonationdate, location } = req.body;

    if (!fname || !lname || !gender || !dob || !bloodgroup || !mobile || !email || !otp || !user_type || !lastdonationdate || !location) {
        res.status(400).json({ error: "Please Enter All Input Data" })
    }

    try {
        const presuer = await users.findOne({ email: email });

        if (presuer) {
            res.status(400).json({ error: "This User Allready exist in our db" })
        } else {
            const userregister = new users({
                fname, lname, gender, dob, bloodgroup,mobile, email, otp, user_type, lastdonationdate, location 
            });

            // here password hasing

            const storeData = await userregister.save();
            res.status(200).json(storeData);
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }

};


// user register otp send 
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




// user login controller

// user send otp
exports.userOtpSend = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ error: "Please Enter Your Email" })
    }


    try {
        const presuer = await users.findOne({ email: email });

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


exports.userLogin = async (req, res) => {
    const { email, otp } = req.body;

    if (!otp || !email) {
        res.status(400).json({ error: "Please Enter Your OTP and email" });
        return; // Add return statement to exit the function if validation fails
    }

    try {
        const otpverification = await userotp.findOne({ email: email });

        if (otpverification.otp === otp) {
            const preuser = await users.findOne({ email: email });

            // token generate
            const token = await preuser.generateAuthtoken();

            // Get all user data
            const userData = {
                user_id: preuser._id,
                user_type : preuser.user_type,
                fname : preuser.fname,
                lname : preuser.lname,
                gender: preuser.gender,
                dob: preuser.dob,
                bloodgroup: preuser.bloodgroup,
                mobile: preuser.mobile,
                email: preuser.email,
                lastdonationdate: preuser.lastdonationdate,
                location : preuser.location


                // Add other user properties as needed
            };

            res.status(200).json({
                message: "User Login Successfully Done",
                userToken: token,
                userData: userData, // Send user data in the response
                success: true,
            });
        } else {
            res.status(400).json({ error: "Invalid Otp", success: false });
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error });
    }
};

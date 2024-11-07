import jwt from 'jsonwebtoken';

const generate_webToken = (res, userID) => {
    const webToken = jwt.sign({ userID }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.cookie('jwt', webToken, {
      httpOnly: true,                                 // Setting jwt as an HTTP-Only cookie (prevents manipulation on document.cookie)
      secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
      sameSite: 'strict',                             // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000,               // 30 days in milliseconds
    });

    console.log(webToken);
    console.log('NODE_ENV', process.env.NODE_ENV);
    console.log('NODE_ENV !== development', process.env.NODE_ENV !== 'development');
    console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Defined' : 'Not Defined');
    return webToken
};

export default generate_webToken;
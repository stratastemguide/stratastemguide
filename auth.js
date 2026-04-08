import { auth, db } from "./firebase-config.js";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendEmailVerification,
    sendPasswordResetEmail,
    signOut
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { 
    doc, 
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// DOM Elements
const signinCard = document.getElementById('signin-card');
const signupCard = document.getElementById('signup-card');
const verifyCard = document.getElementById('verify-card');
const toSignup = document.getElementById('to-signup');
const toSignin = document.getElementById('to-signin');
const backToLogin = document.getElementById('back-to-login');

const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');

const signinEmail = document.getElementById('signin-email');
const signinPassword = document.getElementById('signin-password');
const signinError = document.getElementById('signin-error');

const signupName = document.getElementById('signup-name');
const signupAge = document.getElementById('signup-age');
const signupCountry = document.getElementById('signup-country');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupError = document.getElementById('signup-error');

const toggleSigninPassword = document.getElementById('toggle-signin-password');
const toggleSignupPassword = document.getElementById('toggle-signup-password');

const googleSigninBtn = document.getElementById('google-signin-btn');
const googleSignupBtn = document.getElementById('google-signup-btn');

const resendEmail = document.getElementById('resend-email');
const verifySuccess = document.getElementById('verify-success');

// Forgot Password DOM
const forgotCard = document.getElementById('forgot-card');
const forgotForm = document.getElementById('forgot-form');
const forgotEmail = document.getElementById('forgot-email');
const forgotError = document.getElementById('forgot-error');
const forgotSuccess = document.getElementById('forgot-success');
const toForgot = document.getElementById('to-forgot');
const forgotBackSignin = document.getElementById('forgot-back-signin');

// Profile Completion DOM
const profileCard = document.getElementById('profile-card');
const profileForm = document.getElementById('profile-form');
const profileName = document.getElementById('profile-name');
const profileAge = document.getElementById('profile-age');
const profileCountry = document.getElementById('profile-country');
const profileError = document.getElementById('profile-error');

const showVerifyCard = () => {
    signinCard.style.display = 'none';
    signupCard.style.display = 'none';
    profileCard.style.display = 'none';
    verifyCard.style.display = 'block';
    verifySuccess.style.display = 'none';
};

const showSigninCard = () => {
    verifyCard.style.display = 'none';
    signupCard.style.display = 'none';
    forgotCard.style.display = 'none';
    profileCard.style.display = 'none';
    signinCard.style.display = 'block';
};

const showForgotCard = () => {
    signinCard.style.display = 'none';
    signupCard.style.display = 'none';
    verifyCard.style.display = 'none';
    profileCard.style.display = 'none';
    forgotCard.style.display = 'block';
    forgotError.style.display = 'none';
    forgotSuccess.style.display = 'none';
};

// Resend Verification Email
resendEmail.addEventListener('click', async () => {
    // Note: This requires the user to have just attempted sign-in or sign-up
    // If they were signed out, we might need them to sign in again to get the user object.
    // However, for the flow where they just signed up, they are technically still the "user" context if we handle it right.
    // But since we did signOut(auth), auth.currentUser is null.
    
    // To solve this properly without Firestore, we can tell the user to try signing in, 
    // and if it fails due to verification, we can offer the resend button which then DOES 
    // a quick sign-in to send the email.
    
    // For simplicity, we can ask them to sign in again if the session is lost.
    if (auth.currentUser) {
        try {
            await sendEmailVerification(auth.currentUser);
            verifySuccess.style.display = 'block';
        } catch (error) {
            console.error("Resend error:", error);
            signinError.textContent = "Error sending email. Please try signing in again.";
            signinError.style.display = 'block';
            showSigninCard();
        }
    } else {
        signinError.textContent = "Please sign in to resend the verification email.";
        signinError.style.display = 'block';
        showSigninCard();
    }
});

// Password Visibility Toggle
const setupPasswordToggle = (toggleBtn, passwordInput) => {
    toggleBtn.addEventListener('click', () => {
        const isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
        toggleBtn.textContent = isPassword ? 'Hide' : 'Show';
    });
};

if (toggleSigninPassword) setupPasswordToggle(toggleSigninPassword, signinPassword);
if (toggleSignupPassword) setupPasswordToggle(toggleSignupPassword, signupPassword);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

const handleGoogleSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        
        // Fetch profile to see if it exists
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            localStorage.setItem('userProfile', JSON.stringify(docSnap.data()));
            window.location.href = "index.html";
        } else {
            // New user, collect age and country
            signinCard.style.display = 'none';
            signupCard.style.display = 'none';
            profileCard.style.display = 'block';
            
            // Pre-fill name from Google profile
            if (user.displayName) {
                profileName.value = user.displayName;
            }
        }
    } catch (error) {
        console.error("Google Sign-In error:", error);
        signinError.textContent = "Google Sign-In failed. Please try again.";
        signinError.style.display = 'block';
    }
};

if (googleSigninBtn) googleSigninBtn.addEventListener('click', handleGoogleSignIn);
if (googleSignupBtn) googleSignupBtn.addEventListener('click', handleGoogleSignIn);

// Navigation
toSignup.addEventListener('click', () => {
    signinCard.style.display = 'none';
    profileCard.style.display = 'none';
    signupCard.style.display = 'block';
});

toSignin.addEventListener('click', showSigninCard);
backToLogin.addEventListener('click', showSigninCard);

// Forgot Password Navigation
toForgot.addEventListener('click', showForgotCard);
forgotBackSignin.addEventListener('click', showSigninCard);

// Handle Forgot Password
forgotForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    forgotError.style.display = 'none';
    forgotSuccess.style.display = 'none';

    try {
        await sendPasswordResetEmail(auth, forgotEmail.value);
        forgotSuccess.style.display = 'block';
        forgotEmail.value = '';
    } catch (error) {
        console.error("Password reset error:", error);
        if (error.code === 'auth/user-not-found') {
            forgotError.textContent = "No account found with this email.";
        } else {
            forgotError.textContent = "Error sending reset email. Please try again.";
        }
        forgotError.style.display = 'block';
    }
});

// Handle Sign In
signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    signinError.style.display = 'none';
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, signinEmail.value, signinPassword.value);
        const user = userCredential.user;
        if (user.emailVerified) {
            // Fetch and cache profile
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                localStorage.setItem('userProfile', JSON.stringify(docSnap.data()));
            }
            window.location.href = "index.html";
        } else {
            signinError.textContent = "Please verify your email first. Check your Spam folder!";
            signinError.style.display = 'block';
            showVerifyCard();
        }
    } catch (error) {
        console.error("Sign in error:", error);
        signinError.textContent = "Email or password is incorrect";
        signinError.style.display = 'block';
    }
});

// Handle Sign Up
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    signupError.style.display = 'none';
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value);
        const user = userCredential.user;

        // Save profile data to Firestore
        await setDoc(doc(db, "users", user.uid), {
            name: signupName.value,
            age: signupAge.value,
            country: signupCountry.value,
            email: signupEmail.value,
            createdAt: new Date().toISOString()
        });

        // Backup to localStorage for immediate UI if needed
        localStorage.setItem('userProfile', JSON.stringify({
            name: signupName.value,
            age: signupAge.value,
            country: signupCountry.value,
            email: signupEmail.value
        }));

        console.log('Profile saved to Firestore and localStorage');
        await sendEmailVerification(user);
        showVerifyCard();
    } catch (error) {
        console.error("Sign up error:", error);
        if (error.code === 'auth/email-already-in-use') {
            signupError.textContent = "User already exists. Please sign in";
        } else {
            signupError.textContent = error.message;
        }
        signupError.style.display = 'block';
    }
});

// Handle Profile Completion (for Google users)
if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        profileError.style.display = 'none';
        
        const user = auth.currentUser;
        if (!user) {
            profileError.textContent = "User session lost. Please sign in again.";
            profileError.style.display = 'block';
            return;
        }

        try {
            const profileData = {
                name: profileName.value,
                age: profileAge.value,
                country: profileCountry.value,
                email: user.email,
                createdAt: new Date().toISOString()
            };

            // Save to Firestore
            await setDoc(doc(db, "users", user.uid), profileData);

            // Save to localStorage
            localStorage.setItem('userProfile', JSON.stringify(profileData));

            console.log('Google user profile created');
            window.location.href = "index.html";
        } catch (error) {
            console.error("Profile saving error:", error);
            profileError.textContent = "Error saving profile. Please try again.";
            profileError.style.display = 'block';
        }
    });
}

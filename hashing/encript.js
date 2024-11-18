import bcrypt from 'bcrypt'; // Import bcrypt in ES module syntax

// Function to hash a password
const hashPassword = async (password) => {
    try {
        const saltRounds = 10; // Number of salt rounds for hashing
        const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password
        return hashedPassword; // Return the hashed password
    } catch (error) {
        console.error('Error hashing password:', error); // Log error if hashing fails
    }
};

// Function to verify a password
const verifyPassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword); // Compare the plain text password with the hashed password
        return isMatch; // Return true if the passwords match, otherwise false
    } catch (error) {
        console.error('Error verifying password:', error); // Log error if verification fails
    }
};

// Example usage
(async () => {
    const plainTextPassword = 'mySecurePassword123'; // A plain text password to hash

    // Hash the password
    const hashed = await hashPassword(plainTextPassword); // Call the hashPassword function
    console.log('Hashed Password:', hashed); // Log the hashed password

    // Verify the password
    const isCorrect = await verifyPassword(plainTextPassword, hashed); // Verify the hashed password
    console.log('Password Match:', isCorrect); // Log whether the password matches
})();

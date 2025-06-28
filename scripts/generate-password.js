const bcrypt = require('bcryptjs')

// Script để tạo password hash cho admin
const password = process.argv[2]

if (!password) {
  console.log('Usage: node scripts/generate-password.js <your-password>')
  console.log('Example: node scripts/generate-password.js mySecurePassword123')
  process.exit(1)
}

async function generateHash() {
  try {
    const saltRounds = 12
    const hash = await bcrypt.hash(password, saltRounds)
    
    console.log('\n🔐 Password Hash Generated Successfully!')
    console.log('=====================================')
    console.log(`Password: ${password}`)
    console.log(`Hash: ${hash}`)
    console.log('\n📝 Add this to your .env.local file:')
    console.log(`ADMIN_PASSWORD_HASH=${hash}`)
    console.log('\n⚠️  IMPORTANT:')
    console.log('1. Keep your password secure')
    console.log('2. Never commit .env.local to git')
    console.log('3. Use a strong password (min 8 characters)')
    console.log('4. Change this hash in production')
    
  } catch (error) {
    console.error('Error generating hash:', error)
  }
}

generateHash() 
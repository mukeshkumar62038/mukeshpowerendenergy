import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('====================================================');
console.log('⚡ Mukesh Power & Energy Server & Client Starting...');
console.log('====================================================');

const backendScript = path.join(__dirname, 'backend', 'src', 'server.js');
const frontendVite = path.join(__dirname, 'frontend', 'node_modules', 'vite', 'bin', 'vite.js');
const frontendDir = path.join(__dirname, 'frontend');

// Start Backend (Express + MongoDB)
const backend = spawn(process.execPath, [backendScript], {
  stdio: 'inherit',
  cwd: path.join(__dirname, 'backend')
});

// Start Frontend (Vite)
const frontend = spawn(process.execPath, [frontendVite, frontendDir], {
  stdio: 'inherit',
  cwd: frontendDir
});

backend.on('error', (err) => console.error('Backend process error:', err));
frontend.on('error', (err) => console.error('Frontend process error:', err));

const exitHandler = () => {
  try { backend.kill(); } catch (e) {}
  try { frontend.kill(); } catch (e) {}
  process.exit();
};

process.on('SIGINT', exitHandler);
process.on('SIGTERM', exitHandler);

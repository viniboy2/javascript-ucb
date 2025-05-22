// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      window.location.href = 'dashboard.html';
    } else {
      alert(data.message || 'Erro no login');
    }
  });
}

// Cadastro
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = registerForm.name.value;
    const email = registerForm.email.value;
    const password = registerForm.password.value;

    const res = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert('Cadastro realizado com sucesso!');
      window.location.href = 'index.html';
    } else {
      alert(data.message || 'Erro no cadastro');
    }
  });
}

// Adicionar tarefas
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
if (taskForm) {
  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('taskTitle').value;

    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title })
    });

    const data = await res.json();
    if (res.ok) {
      loadTasks();
    } else {
      alert(data.message || 'Erro ao adicionar tarefa');
    }
  });
}

async function loadTasks() {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:3000/api/tasks', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const tasks = await res.json();
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.title;
    taskList.appendChild(li);
  });
}

if (taskList) {
  loadTasks();
}

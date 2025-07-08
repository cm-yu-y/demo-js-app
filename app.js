class LoginApp {
    constructor() {
        this.loginScreen = document.getElementById('login-screen');
        this.successScreen = document.getElementById('success-screen');
        this.loginForm = document.getElementById('loginForm');
        this.errorMessage = document.getElementById('error-message');
        this.welcomeUsername = document.getElementById('welcome-username');
        this.logoutBtn = document.getElementById('logout-btn');
        
        this.init();
    }
    
    init() {
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        this.logoutBtn.addEventListener('click', () => this.handleLogout());
        this.initErrorTestButtons();
    }
    
    async handleLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        this.clearError();
        
        if (!username || !password) {
            this.showError('ユーザー名とパスワードを入力してください');
            return;
        }
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.showSuccess(username);
            } else {
                this.showError(data.message || 'ログインに失敗しました');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showError('サーバーエラーが発生しました');
        }
    }
    
    handleLogout() {
        this.showLogin();
        this.clearForm();
    }
    
    showSuccess(username) {
        this.welcomeUsername.textContent = username;
        this.loginScreen.classList.add('hidden');
        this.successScreen.classList.remove('hidden');
    }
    
    showLogin() {
        this.successScreen.classList.add('hidden');
        this.loginScreen.classList.remove('hidden');
    }
    
    showError(message) {
        this.errorMessage.textContent = message;
    }
    
    clearError() {
        this.errorMessage.textContent = '';
    }
    
    clearForm() {
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        this.clearError();
    }
    
    initErrorTestButtons() {
        document.getElementById('error-btn-1').addEventListener('click', () => this.triggerTypeError());
        document.getElementById('error-btn-2').addEventListener('click', () => this.triggerReferenceError());
        document.getElementById('error-btn-3').addEventListener('click', () => this.triggerCustomError());
        document.getElementById('error-btn-4').addEventListener('click', () => this.triggerPromiseReject());
        document.getElementById('error-btn-5').addEventListener('click', () => this.triggerAsyncError());
    }
    
    triggerTypeError() {
        const obj = null;
        obj.someProperty;
    }
    
    triggerReferenceError() {
        nonExistentVariable.someMethod();
    }
    
    triggerCustomError() {
        throw new Error('RUMテスト用のカスタムエラー');
    }
    
    triggerPromiseReject() {
        Promise.reject(new Error('Promise rejection test for RUM'));
    }
    
    async triggerAsyncError() {
        await new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('非同期エラーテスト'));
            }, 100);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LoginApp();
});
function themeSetter(theme){
    const root = document.documentElement;
    if(theme =='light'){
      root.style.setProperty('--primary-color','var(--light-primary-color)');
      root.style.setProperty('--secondary-color','var(--light-secondary-color)');
      root.style.setProperty('--text-color','var(--light-text-color)');
      root.style.setProperty('--form-and-about-me-text-color','var(--light-form-and-about-me-text-color)');
      root.style.setProperty('--background-color','var(--light-background-color)');
    }
    else{
      root.style.setProperty('--primary-color','var(--dark-primary-color)');
      root.style.setProperty('--secondary-color','var(--dark-secondary-color)');
      root.style.setProperty('--text-color','var(--dark-text-color)');
      root.style.setProperty('--form-and-about-me-text-color','var(--dark-form-and-about-me-text-color)');
      root.style.setProperty('--background-color','var(--dark-background-color)');
    }
}
  
function themeButton(){
  let newTheme = '';
  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme == 'light'){newTheme = 'dark';}
  else{newTheme = 'light';}

  localStorage.setItem('theme', newTheme);
  themeSetter(newTheme);
}
  
function setLocalTheme(){
  const local = localStorage.getItem('theme') || 'light';
  if(local){
    themeSetter(local);
    document.getElementById('theme_switcher').checked = local==='dark';
  }
}
  
document.addEventListener('DOMContentLoaded', setLocalTheme)

document.addEventListener('DOMContentLoaded', () => {
  const JS_toggle = document.getElementById('theme');

  if(JS_toggle){
    JS_toggle.style.display = 'block';
  }
});
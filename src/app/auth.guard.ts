import { CanActivateFn, Router } from '@angular/router';
import { RegistrationService } from './registration/RegistrationService';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const regService = inject(RegistrationService);
  const router = inject(Router); // Инжектируем Router для перенаправления

  // Возвращаем Promise с результатом проверки аутентификации
  return regService.CheckAuthentication().then(isAuthenticated => {
    if (!isAuthenticated) {
      // Если пользователь не авторизован, перенаправляем на страницу входа
      router.navigate(['/login']);
      return false; // Запрещаем доступ
    }
    const role = regService.GetCurrentRole();

    // Если пользователь админ и не на админской панели
    if (role === 'admin' ) {
      router.navigate(['/adminka']);
      return false; // Запрещаем доступ к текущему маршруту
    }


    return true; // Если все проверки пройдены, разрешаем доступ
  });
};

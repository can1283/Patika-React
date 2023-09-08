import getData from './app';

(async () => {
  try {
    const userId = 1; // Kullanıcı ID'sini istediğiniz değere ayarlayın
    const result = await getData(userId);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
})();

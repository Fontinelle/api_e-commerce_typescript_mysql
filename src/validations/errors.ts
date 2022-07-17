/* eslint-disable no-unused-expressions */
interface IStore {
  name?: string;
  CNPJ?: string;
  CPF?: string;
  email?: string;
  phoneNumber?: string;
}

const err = (
  exists: IStore,
  name: string,
  email: string,
  phoneNumber: string,
  type: string,
  CNPJ?: string,
  CPF?: string,
) => {
  const errors = [''];
  let n = 0;
  let text = '';

  type === 'store' ? (text = 'Uma loja') : (text = 'Um usuário');
  if (exists?.name === name) {
    errors[n] = `${text} já foi cadastrada com esse nome`;
    n += 1;
  }
  if (exists?.email === email) {
    errors[n] = `${text} já foi cadastrada com esse e-mail`;
    n += 1;
  }
  if (exists?.phoneNumber === phoneNumber) {
    errors[n] = `${text} já foi cadastrada com esse numero de telefone`;
    n += 1;
  }
  if (CNPJ) {
    if (exists?.CNPJ === CNPJ) {
      errors[n] = `${text} já foi cadastrada com esse CNPJ`;
      n += 1;
    }
  }
  if (CPF) {
    if (exists?.CPF === CPF) {
      errors[n] = `${text} já foi cadastrada com esse CPF`;
      n += 1;
    }
  }
  return errors;
};

export default err;

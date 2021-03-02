export class BaseModal {
  
  private emit: any;
  constructor(emit: any) {
    this.emit = emit;
  }

  onClickModalClose() {
    window.onkeydown = null;
    this.emit('onClickModalCloseIn', false);
  }
  onClickModalCreate(data: any) {
    this.emit('onClickModalCreateIn', data);
  }
  onPressEsc() {
    window.onkeydown = (e: any) => {  
      if (e.key === 'Escape') this.onClickModalClose();
    };
  }
}
export class BaseEntity {

  /**
  * base entity identifier
  */
  id?: string;
  /**
   * policy name or title
   */
  name?: string;
  /**
    * Date of creation
    */
  createdDate?: Date;
  /**
   * Date of update
   */
  updatedDate?: Date;

  constructor(){
    this.name = "";
  }
}
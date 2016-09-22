let latency = 200;
let id = 0;

function getId() {
  return ++id;
}

let nations = [
  { id: 1, name: 'Iran', abbr: 'ir' },
  { id: 2, name: 'Australia', abbr: 'au' },
  { id: 3, name: 'Canada', abbr: 'ca' },
  { id: 4, name: 'United States', abbr: 'us' }
]

let contacts = [
  {
    id: getId(),
    firstName: 'John',
    lastName: 'Tolkien',
    email: 'tolkien@inklings.com',
    phoneNumber: '867-5309',
    nationality: 1,
    rate: 5,
    gender: 'Male'
  },
  {
    id: getId(),
    firstName: 'Clive',
    lastName: 'Lewis',
    email: 'lewis@inklings.com',
    phoneNumber: '867-5309',
    nationality: 2,
    rate: 4,
    gender: 'Male'
  },
  {
    id: getId(),
    firstName: 'Owen',
    lastName: 'Barfield',
    email: 'barfield@inklings.com',
    phoneNumber: '867-5309',
    nationality: 3,
    rate: 4,
    gender: 'Male'
  },
  {
    id: getId(),
    firstName: 'Charles',
    lastName: 'Williams',
    email: 'williams@inklings.com',
    phoneNumber: '867-5309',
    nationality: 4,
    rate: 3,
    gender: 'Male'
  },
  {
    id: getId(),
    firstName: 'Roger',
    lastName: 'Green',
    email: 'green@inklings.com',
    phoneNumber: '867-5309',
    nationality: 2,
    rate: 5,
    gender: 'Male'
  }
];

export class WebAPI {
  isRequesting = false;

  getContactList() {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = contacts.map(x => {
          return {
            id: x.id,
            firstName: x.firstName,
            lastName: x.lastName,
            email: x.email, nationality: x.nationality, rate: x.rate, gender: x.gender
          }
        });
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }


  getCountryList() {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = nations.map(x => {
          return {
            id: x.id,
            name: x.name,
            abbr: x.abbr
          }
        });
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  getContactDetails(id) {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = contacts.filter(x => x.id == id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }

  saveContact(contact) {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(contact));
        let found = contacts.filter(x => x.id == contact.id)[0];

        if (found) {
          let index = contacts.indexOf(found);
          contacts[index] = instance;
        } else {
          instance.id = getId();
          contacts.push(instance);
        }

        this.isRequesting = false;
        resolve(instance);
      }, latency);
    });
  }
}

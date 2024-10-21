var contactStore = (function () {
    let contactListString = localStorage.getItem("contactList");
    var contactList = contactListString ? JSON.parse(contactListString) : [];

    return {
        add: function (_name, _firstname, _date, _adress, _mail) {
            var contact = {
                name: _name,
                firstname: _firstname,
                date: _date,
                adress: _adress,
                mail: _mail,
            };
            contactList.push(contact);
            localStorage.setItem("contactList", JSON.stringify(contactList));
            return contactList;
        },
        reset: function () {
            localStorage.removeItem("contactList");
            contactList = [];
            return contactList;
        },
        getList: function () {
            return contactList;
        },
        remove: function (index) {
            contactList.splice(index, 1);
            localStorage.setItem("contactList", JSON.stringify(contactList));
        },
    };
})();

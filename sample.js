var unfolder = require('./unfolder');

var objects = [];

var sampleObject1 = {
    name     : {
        first : 'Jon',
        middle: 'Thomas',
        last  : 'Peterson'
    },
    age      : 24,
    education: {
        school    : {
            location: {
                country: 'Some',
                city   : 'Big'
            },
            type    : 'state',
            number  : 4
        },
        university: {
            location: {
                country: 'Some',
                city   : 'Big'
            },
            type    : 'state',
            faculty : 'Math'
        }
    }
};

var sampleObject2 = {
    name     : {
        first : 'Evans',
        middle: 'Mighty',
        last  : 'Doorn'
    },
    age      : 54,
    education: {
        school    : {
            location: {
                country: 'Other',
                city   : 'Reil'
            },
            type    : 'state',
            number  : 9
        },
        university: {
            location: {
                country: 'Some',
                city   : 'Fern'
            },
            type    : 'state',
            faculty : 'Physics'
        }
    }
};

var map = [{map: "First Name", property: 'name.first'},
    {map: "Middle Name", property: 'name.middle'},
    {map: "Last Name", property: 'name.last'},
    {map: "Age", property: 'age'},
    {map: "School County", property: 'education.school.location.country'},
    {map: "School City", property: 'education.school.location.city'},
    {map: "School Type", property: 'education.school.type'},
    {map: "School Number", property: 'education.school.number'},
    {map: "University County", property: 'education.university.location.country'},
    {map: "University City", property: 'education.university.location.city'},
    {map: "University Type", property: 'education.university.type'},
    {map: "University Faculty", property: 'education.university.faculty'}];

objects.push(sampleObject1, sampleObject2);

unfolder.convertToLinearObjects(objects, map, function (err, result) {
    console.dir(result);
});

unfolder.convertToLinearObjects(objects,null,function (err, result) {
    console.dir(result);
});


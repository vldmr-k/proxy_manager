

let ParseProxy = (input) => {

    let columns = ['source_addr', 'source_port', 'local_addr', 'local_port', 'tags']
    let lines = input.split(/\n/);
    let rows = [];

    lines = lines.map(item => {
        return  item.trim()
    }).filter(item => {
            return item.length > 0
    });

    lines.forEach((value, index) => {
        let o = new Object();
        let cols = value.split(/;/);

        cols.forEach((v, i) => {
            let name = columns[i];

            if(name == 'tags') {
                let tags = v.split(/,/).map(item => {
                    return item.trim();
                }).filter(item => {
                    return item.length > 0
                });

                o[name] = tags;
            } else {
                o[name] = v;
            }
        });

        rows.push(o);
    });


    return rows;
};

export default ParseProxy
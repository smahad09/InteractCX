const formatDate = (shipmentDate)=> {

    const options = {weekday: 'long', day: 'numeric', month: 'short', year: 'numeric'};    
    const d = new Date(shipmentDate);

    const fd = d.toLocaleDateString("en-US",options);
    return fd;
};

module.exports = formatDate;
const { default: SummeryApi } = require("../commonApi");

  export  const handleSend = async (email) => {
  try {
    // console.log("ankur")
    const res = await fetch(SummeryApi.SendMAil.url, {
      method: SummeryApi.SendMAil.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email:email }),
    });

    const result = await res.json();

    if (result.success) {

console.log(result.message);
    } 
    else {
      console.log('Failed to send email.');
    }
  } catch (err) {
    console.log('Failed to send email.');
  }
};
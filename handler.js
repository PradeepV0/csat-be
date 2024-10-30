const { Client } = require('pg'); 
const { connectDB, pool } = require('./db');

module.exports.createOrganization = async (event) => {

  const { organizationName, location } = JSON.parse(event.body);

  if (!organizationName || !location) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required fields' }),
    };
  }
  try {
    await connectDB();
    await pool.query(
      `INSERT INTO public.organization (organization_name, location) VALUES ($1, $2)`,
      [organizationName, location]
    );
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Organization created successfully!' }),
    };
  } catch (err) {
    console.error('Error inserting organization:', err.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create organization' }),
    };
  }
};

module.exports.getOrganizations = async (event) => {

  try {
    await connectDB();
    let result = await pool.query('SELECT * FROM public.organization');
     return {
      statusCode: 200,
      body: JSON.stringify(result.rows), // Return the list of organizations
    };
  } catch (err) {
    console.error('Error fetching organizations:', err.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch organizations' }),
    };
  }
};


module.exports.getContactPersons = async (event) => {

  try {
    await connectDB();
    let result = await pool.query('SELECT * FROM public.contactperson');
     return {
      statusCode: 200,
      body: JSON.stringify(result.rows), // Return the list of organizations
    };
  } catch (err) {
    console.error('Error fetching organizations:', err.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch organizations' }),
    };
  }
};

module.exports.getOrganization = async (event) => {
  const orgId = event.pathParameters.orgId;
  try {
    await connectDB();
    let result = await pool.query('SELECT * FROM public.organization WHERE organization_id = $1', [orgId]);
     return {
      statusCode: 200,
      body: JSON.stringify(result.rows), // Return the list of organizations
    };
  } catch (err) {
    console.error('Error fetching organizations:', err.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch organizations' }),
    };
  }
};

module.exports.getContactPersons = async (event) => {

  try {
    await connectDB();
    let result = await pool.query('SELECT * FROM public.contactperson');
     return {
      statusCode: 200,
      body: JSON.stringify(result.rows), // Return the list of organizations
    };
  } catch (err) {
    console.error('Error fetching organizations:', err.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch organizations' }),
    };
  }
};


module.exports.getSurveyDetails = async (event) => {

  try {
    await connectDB();
    let result = await pool.query('SELECT * FROM public.surveydetails');
     return {
      statusCode: 200,
      body: JSON.stringify(result.rows), // Return the list of organizations
    };
  } catch (err) {
    console.error('Error fetching organizations:', err.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch organizations' }),
    };
  }
};

module.exports.createContactPerson = async (event) => {
  const {contacts} = JSON.parse(event.body);
  console.log(contacts,JSON.parse(event.body),'JSON.parse(event.body)',contacts.length);
  console.log(contacts.length,contacts.length > 0,'ontacts.length > 0');
  
  if (!contacts.length > 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required fields' }),
    };
  }
  try {
    await connectDB();
    const queries = contacts.map((contact)=> pool.query(
        `INSERT INTO public.contactperson (organization_id, contact_name, designation, contact_type, mobile_number, email_address,location,organization_name) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [contact.organization_id, contact.contact_name, contact.designation, contact.contact_type, contact.mobile_number, contact.email_address,contact.location,contact.organization_name]
      )
    )
    await Promise.all(queries)
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Organization created successfully!' }),
    };
  } catch (err) {
    console.error('Error inserting organization:', err.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create organization' }),
    };
  }
};


module.exports.createSurveyDetails = async (event) => {
  const { client_id, client_name, contact_id, contact_name, surveydetails,contact_type ,created_at,mobile_number, email_address,location,designation} = JSON.parse(event.body);
  // console.log(JSON.parse(event.body),'JSON.parse(event.body)');
  

  // if (!client_id || !client_name || !contact_id || !contact_name || !surveydetails|| !contact_type  || !mobile_number || !email_address || !location || !designation) {
  //   return {
  //     statusCode: 400,
  //     body: JSON.stringify({ error: 'Missing required fields' }),
  //   };
  // }
  try {
    await connectDB();
    await pool.query(
        `INSERT INTO public.surveydetails (client_id, client_name, contact_id, contact_name, surveydetails,contact_type,mobile_number, email_address,location,designation) 
      VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10)`,
      [
        client_id,
        client_name,
        contact_id,
        contact_name,
        JSON.stringify(surveydetails),
        contact_type,
        mobile_number,
        email_address,
        location,
        designation
        // created_at
      ]
      )
    
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Organization created successfully!' }),
    };
  } catch (err) {
    console.error('Error inserting organization:', err.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create organization' }),
    };
  }
};
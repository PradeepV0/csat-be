import { Client } from 'pg'; // PostgreSQL client

exports.handler = async (event) => {
    const client = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: 5432,
        ssl: { rejectUnauthorized: false }
    });

    const { organizationId, contactPerson, surveyResponses } = JSON.parse(event.body);

    try {
        await client.connect();

        // Insert contact person if not exists (assuming email is unique)
        const contactInsertResult = await client.query(
            `INSERT INTO contacts (organization_id, name, designation, type, mobile, email)
             VALUES ($1, $2, $3, $4, $5, $6)
             ON CONFLICT (email) DO UPDATE
             SET name = EXCLUDED.name, designation = EXCLUDED.designation,
                 type = EXCLUDED.type, mobile = EXCLUDED.mobile
             RETURNING id`,
            [
                organizationId,
                contactPerson.name,
                contactPerson.designation,
                contactPerson.type,
                contactPerson.mobile,
                contactPerson.email
            ]
        );

        const contactId = contactInsertResult.rows[0].id;

        // Insert survey responses associated with the contact person
        const surveyInsertPromises = surveyResponses.map(async (response) => {
            await client.query(
                `INSERT INTO survey_responses (organization_id, contact_id, question, answer)
                 VALUES ($1, $2, $3, $4)`,
                [
                    organizationId,
                    contactId,
                    response.question,
                    response.answer
                ]
            );
        });

        await Promise.all(surveyInsertPromises);

        await client.end();

        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Survey responses submitted successfully!' }),
        };
    } catch (err) {
        console.error(err);
        await client.end();
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to submit survey responses' }),
        };
    }
};

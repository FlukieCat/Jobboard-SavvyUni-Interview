const crawler = (db) => {
    const request = require('request');
    const cheerio = require('cheerio');
    const Job = require('./models/Job');
    db.db.dropCollection('jobs', () => {
        console.log('Recreating database for new jobs');
        let savedJobs = 0;
        let count = 0;
        while (count < 100) {
            request(
                `https://ca.indeed.com/jobs?q=web+developer&start=${savedJobs}`,
                (error, response, html) => {
                    if (!error && response.statusCode == 200) {
                        const $ = cheerio.load(html);

                        $('.jobsearch-SerpJobCard').each(async (i, el) => {
                            const title = $(el).find('.title a').attr('title');
                            const link =
                                'https://ca.indeed.com' +
                                $(el).find('.title a').attr('href');
                            const company = $(el)
                                .find('.sjcl .company')
                                .text()
                                .replace(/\s+/g, '');
                            const location = $(el)
                                .find('.sjcl .location')
                                .text();
                            const description = $(el)
                                .find('.summary li')
                                .text();

                            try {
                                let job = new Job({
                                    title,
                                    company,
                                    description,
                                    location,
                                    link,
                                });
                                await job.save();
                            } catch (error) {
                                console.error(error);
                            }
                        });
                    }
                }
            );
            savedJobs = savedJobs + 10;
            count = count + 1;
        }
        console.log(`Populated jobs in database`);
    });
};

module.exports = crawler;

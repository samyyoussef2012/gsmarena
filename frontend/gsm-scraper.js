const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

/**
 * GSMArena Scraper Utility
 * Pulls phone listings from brand pages (e.g., Samsung, Apple).
 */
async function scrapeBrand(brandUrl) {
    console.log(`Starting to scrape: ${brandUrl}...`);
    try {
        const { data } = await axios.get(brandUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const $ = cheerio.load(data);
        const phones = [];

        // Extract brand from header
        const brandName = $('.article-info-name').text().replace(' phones', '').trim() || 'Brand';

        $('.makers ul li').each((i, el) => {
            const a = $(el).find('a');
            const img = a.find('img');
            const modelName = a.find('strong span').text().trim() || a.find('strong').text().trim();
            const href = a.attr('href');
            const slug = href ? href.replace('.php', '') : '';
            const thumbnail = img.attr('src');
            const summary = img.attr('title') || '';

            // Simple parser for the summary title
            const specs = {
                display: { 
                  size: (summary.match(/(\d+\.\d+)″/) || [])[1] || '',
                  type: 'AMOLED' // Default mock
                },
                platform: { 
                  chipset: (summary.match(/,\s+([^,]*)\s+chipset/) || [])[1] || '' 
                },
                battery: { 
                  capacity_mah: (summary.match(/(\d+)\s+mAh/) || [])[1] || '' 
                },
                memory: { 
                  internal: (summary.match(/,\s+(\d+\s+GB\s+storage)/) || [])[1] || '',
                  ram: (summary.match(/,\s+(\d+\s+GB\s+RAM)/) || [])[1] || ''
                }
            };

            phones.push({
                _id: slug,
                brand: brandName,
                model: modelName,
                slug,
                category: 'Phone',
                images: thumbnail ? [thumbnail] : [],
                thumbnail: thumbnail || '',
                rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)), // Ensure rating is a number
                rating_count: Math.floor(Math.random() * 2000),
                is_featured: i < 3,
                price_usd: Math.floor(Math.random() * 600 + 200),
                createdAt: new Date().toISOString(),
                specs
            });
        });

        console.log(`Successfully scraped ${phones.length} phones for ${brandName}!`);
        return phones;
    } catch (error) {
        console.error(`Error scraping ${brandUrl}:`, error.message);
        return [];
    }
}

async function main() {
    const brandsToScrape = [
        'https://www.gsmarena.com/samsung-phones-9.php',
        'https://www.gsmarena.com/apple-phones-48.php',
        'https://www.gsmarena.com/xiaomi-phones-80.php',
        'https://www.gsmarena.com/google-phones-107.php',
        'https://www.gsmarena.com/oppo-phones-82.php',
    ];

    let allPhones = [];

    for (const url of brandsToScrape) {
        const brandPhones = await scrapeBrand(url);
        allPhones = allPhones.concat(brandPhones);
        // Delay to avoid being blocked
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (allPhones.length > 0) {
        const outputPath = path.join(__dirname, '..', 'frontend', 'src', 'shared', 'constants', 'phones.json');
        fs.writeFileSync(outputPath, JSON.stringify(allPhones, null, 2));
        console.log(`\nSuccessfully saved ${allPhones.length} total phones across ${brandsToScrape.length} brands to ${outputPath}`);
    }
}

main();


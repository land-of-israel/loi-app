import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { loadAllData } from "./data-loader.ts";
import {log} from "@acdh-oeaw/lib"


const outputFolder = join(process.cwd(), "src", "lib", "data", "processed");
mkdirSync(outputFolder, {recursive: true})

async function main() {
    try {
        log.info("Loading data")
        const rawData = loadAllData()

        log.info("Start processing data ...")


        const processedAuthors = rawData.authors.map((author) => {
            const related_works = rawData.works.filter(w => w.author.some(a => a.id === author.id))
            .map(w => {
                return {
                    loi_id: w.loi_id,
                    title: w.title
                }
            });
            return {
                loi_id: author.loi_id,
                id: author.id,
                name: author.name.trim(),
                works: related_works,
                gnd: author.gnd ?? '',
                wikidata: author.wikidata ?? '', 
                }   
        });

        writeJson("authors.json", processedAuthors)


        const processed_works = rawData.works.map(w => {
            const related_passages = rawData.passages.filter(p => p.work.some(work => work.id === w.id))
                .map(p => {
                    return {
                        loi_id: p.loi_id,
                        title: p.title,
                        text: p.text,
                        translation: p.translation,
                        keywords: p.keywords.map(k => {
                            return {
                                loi_id: `loi_keyword__${k.id}`,
                                value: k.value,
                            }
                        }),
                    }
                });
            const dates = rawData.dates.filter(d => w.date.some(dat => dat.id === d.id))
                .map(date => {
                    return {                  
                        tpq: date.tpq ?? '',
                        taq: date.taq ?? '',
                        label: date.label
                    }
                });
            const place = rawData.places.filter(pl => w.place.some(p => p.id === pl.id))
                .map(pl => {
                    return {
                        loi_id: pl.loi_id,
                        name: pl.name,
                        geoname: pl.geonames,
                        wikidata: pl.wikidata,
                    }
                })
            return {
                loi_id: w.loi_id,
                id: w.id,
                title: w.title ?? "",
                author: w.author.map(a => {
                    return {
                        loi_id: `loi_author__${a.id}`,
                        name: a.value
                    }
                }),
                date: dates,
                place: place,
                language: w.language.map(l => l.value).join(" | "),
                passages: related_passages,
            }
        })

        writeJson("works.json", processed_works)

        const processed_passages = rawData.passages.map(p => {
            const quotes = rawData.bible_ref.filter(ref => p.bibl_quotes.some(q => q.id === ref.id))
                .map(ref => {
                    return {
                        loi_id: ref.loi_id,
                        bible: ref.bible,
                        text: ref.text,
                    }
                })
            const work_aut = processed_works.filter(pw => p.work[0]?.id === pw.id).map(pw => {
                return {
                    loi_id: pw.loi_id,
                    title: pw.title,
                    author: pw.author,
                }
            })
            return {
                loi_id: p.loi_id,
                title: p.title ?? "N/A",
                work: work_aut,
                text: p.text ?? "",
                translation: p.translation ?? "",
                german_translation: p.german_translation ?? "",
                bibl_quotes: quotes,
                commentary: p.commentary ?? "",
                keywords: p.keywords.map(k => {
                    return {
                        loi_id: `loi_keyword__${k.id}`,
                        value: k.value
                    }
                })
            }
        })

        writeJson("passages.json", processed_passages)

        const processed_keywords = rawData.keywords.map(kw => {
            const related_passages = processed_passages.filter(pp => pp.keywords.some(k => k.loi_id === kw.loi_id)).map(p => {
                return {
                    loi_id: p.loi_id,
                    title: p.title,
                    work: p.work
                }
            })
            return {
                loi_id: kw.loi_id,
                label: kw.label,
                notes: kw.notes,
                passages: related_passages
            }
        })
        writeJson("keywords.json", processed_keywords)
    }
     catch (error) {
        log.error("Processing failed", error)
        process.exit(1);
     }
}

main()
// helpers
function writeJson(filename: string, data: unknown) : void { 
   try {
     writeFileSync(
        join(outputFolder, filename),
        JSON.stringify(data, null, 2),
        "utf8");
        log.success(`${filename} written successfully`)
   }
   catch (error) {
    log.error(`Failed to write ${filename}`, error);
    throw error;
   }
}


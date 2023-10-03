import { getUserLanguages } from '@/services/getUserLanguages';
import { PageParams } from '@/types';
import Image from '@/components/Image';
import { redirect } from 'next/navigation';
import languages from '@/languages.json'

async function getData(username: string) {
	const res = await getUserLanguages(username);

	if (!res) {
		redirect('/404');
	}

	return res;
}

export default async function Page(props: PageParams) {
	const data = await getData(props.params.username);
	const userLanguages = Object.keys(data);
	
	
	const userLanguagesWithBadges = userLanguages.filter((language) => {
		return languages.find((lang) => lang.name.toLocaleLowerCase() === language.toLocaleLowerCase());
	}).map((language, key) => {
		const langName = language.toLocaleLowerCase();
		const languageData = languages.find((l) => l.name === langName);
		return {
			name: language,
			stats: data[language],
			source: languageData?.source ?? '',
		};
	}).sort((a, b) => {
		return b.stats - a.stats;
	});
	
	return (
		<main>
			<svg style={{
				display: 'flex',
				flexWrap: 'wrap',
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
				{userLanguagesWithBadges.map((language) => {
					return (
						<div key={language.name}>
							<Image icon={language.source} />
						</div>
					);	
				})}
			</svg>
		</main>
	);
}

const FOUR_HOURS_IN_SECONDS = 60 * 60 * 4;

export const revalidate = FOUR_HOURS_IN_SECONDS;
export const dynamic = 'force-static';

import { getUserLanguages } from '@/services/getUserLanguages';
import { PageParams } from '@/types';
import Image from '@/components/Image';
import { redirect } from 'next/navigation';
import languages from '@/languages.json';

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

	const userLanguagesWithBadges = userLanguages
		.filter((language) => {
			return languages.find(
				(lang) => lang.name.toLocaleLowerCase() === language.toLocaleLowerCase()
			);
		})
		.map((language, key) => {
			const langName = language.toLocaleLowerCase();
			const languageData = languages.find((l) => l.name === langName);
			return {
				name: language,
				stats: data[language],
				source: languageData?.source ?? '',
			};
		})
		.sort((a, b) => {
			return b.stats - a.stats;
		});

	const spacing = 10;
	const box = {
		width: 30 * userLanguagesWithBadges.length + spacing * userLanguagesWithBadges.length,
		height: 30,
	} 
	return (
		<main>
			<svg
				width={box.width}
				height={box.height}
				xmlns="http://www.w3.org/2000/svg"
			>
				{userLanguagesWithBadges.map((language, order) => {
					return <Image key={language.name} icon={language.source} order={order} />;
				})}
			</svg>
		</main>
	);
}

const FOUR_HOURS_IN_SECONDS = 60 * 60 * 4;

export const revalidate = FOUR_HOURS_IN_SECONDS;
export const dynamic = 'force-static';

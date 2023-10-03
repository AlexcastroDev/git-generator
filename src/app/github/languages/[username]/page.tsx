import { getUserLanguages } from '@/services/getUserLanguages';
import { PageParams } from '@/types';
import { redirect } from 'next/navigation';

async function getData(username: string) {
	const res = await getUserLanguages(username);

	if (!res) {
		redirect('/404');
	}

	return res;
}

export default async function Page(props: PageParams) {
	const data = await getData(props.params.username);

	return <main>{JSON.stringify(data)}</main>;
}

const FOUR_HOURS_IN_SECONDS = 60 * 60 * 4;

export const revalidate = FOUR_HOURS_IN_SECONDS;
export const dynamic = 'force-static';

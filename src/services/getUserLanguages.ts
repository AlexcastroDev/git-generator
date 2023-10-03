import { GithubRepositoryResponse, LanguageDictionary } from '@/types';
import { api, queryData } from '@/services';

const generateQuery = (username: string) => `
  query {
    user(login: "${username}") {
      repositories(first: 100) {
        nodes {
          name
          languages(first: 10) {
            edges {
              size
              node {
                name
              }
            }
          }
        }
      }
    }
  }
`;

function getLanguagesForRepo(response: GithubRepositoryResponse) {
	const repositories = response.data.user.repositories.nodes;
	const languages: LanguageDictionary = {};

	for (const repo of repositories) {
		for (const edge of repo.languages.edges) {
			const langName = edge.node.name;
			const langSize = edge.size;

			languages[langName] = (languages[langName] || 0) + langSize;
		}
	}

	return languages;
}

export async function getUserLanguages(user: string) {
	if (!user) {
		return null;
	}

	const response = await queryData<GithubRepositoryResponse>(
		generateQuery(user)
	);

	if (!response?.data?.user) {
		return null;
	}

	const body = getLanguagesForRepo(response);
	return body;
}

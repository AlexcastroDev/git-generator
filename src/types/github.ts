export interface GithubRepositoryResponse {
  data: {
    user: {
      repositories: {
        nodes: {
          name: string;
          languages: {
            edges: {
              size: number;
              node: {
                name: string;
              };
            }[];
          };
        }[];
      };
    };
  };
}

{application,emqx_bridge_http,
             [{description,"EMQX HTTP Bridge and Connector Application"},
              {vsn,"0.1.3"},
              {registered,[]},
              {applications,[kernel,stdlib,emqx_connector,emqx_resource,
                             ehttpc]},
              {env,[]},
              {modules,[emqx_bridge_http_connector,emqx_bridge_http_schema]},
              {links,[]}]}.

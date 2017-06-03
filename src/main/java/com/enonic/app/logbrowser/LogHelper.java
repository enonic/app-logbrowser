package com.enonic.app.logbrowser;

import java.nio.file.Path;
import java.nio.file.Paths;

public final class LogHelper
{

    public static Path getLogPath()
    {
        final String xpHome = System.getenv( "XP_HOME" );
        if ( xpHome == null )
        {
            throw new RuntimeException( "" );
        }
        return Paths.get( xpHome, "logs", "server.log" );
    }

}

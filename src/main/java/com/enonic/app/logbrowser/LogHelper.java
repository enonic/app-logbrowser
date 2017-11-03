package com.enonic.app.logbrowser;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.enonic.xp.home.HomeDir;

public final class LogHelper
{

    public static Path getLogPath()
    {
        final File xpHome = HomeDir.get().toFile();
        return Paths.get( xpHome.getAbsolutePath(), "logs", "server.log" );
    }

}
